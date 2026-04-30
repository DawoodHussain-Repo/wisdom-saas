"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
  try {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("companions")
      .insert({ ...formData, author })
      .select();

    if (error) {
      console.error("Error creating companion:", error.message);
      return null;
    }
    return data?.[0] ?? null;
  } catch (error) {
    console.error("Supabase connection error in createCompanion:", error);
    return null;
  }
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  try {
    const supabase = createSupabaseClient();
    const { userId } = await auth();
    let query = supabase.from("companions").select();
    if (userId) {
      query = query.eq("author", userId);
    }
    if (subject && topic) {
      query = query
        .ilike("subject", `%${subject}%`)
        .or(`topic.ilike.%${topic}%`);
    } else if (subject) {
      query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
      query = query.ilike("topic", `%${topic}%`);
    }
    query = query.range((page - 1) * limit, page * limit - 1);
    const { data: companions, error } = await query;
    if (error) {
      console.error("Error fetching companions:", error.message);
      return [];
    }
    return companions ?? [];
  } catch (error) {
    console.error("Supabase connection error in getAllCompanions:", error);
    return [];
  }
};

export const getCompanion = async (id: string) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("companions")
      .select()
      .eq("id", id);

    if (error) {
      console.error("Error fetching companion:", error.message);
      return null;
    }
    return data?.[0] ?? null;
  } catch (error) {
    console.error("Supabase connection error in getCompanion:", error);
    return null;
  }
};
export const addToSessionHistory = async (companionId: string) => {
  try {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("session_history").insert({
      companion_id: companionId,
      user_id: userId,
    });

    if (error) {
      console.error("Error adding session history:", error.message);
      return null;
    }

    return data ?? null;
  } catch (error) {
    console.error("Supabase connection error in addToSessionHistory:", error);
    return null;
  }
};

export const getRecentSessions = async (limit = 10) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("session_history")
      .select(`id, companions:companion_id (*)`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching recent sessions:", error.message);
      return [];
    }

    return (data ?? []).map(({ id, companions }) => ({
      ...companions,
      sessionId: id,
    }));
  } catch (error) {
    console.error("Supabase connection error in getRecentSessions:", error);
    return [];
  }
};

export const getUserSessions = async (userId: string, limit = 10) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("session_history")
      .select(`companions:companion_id (*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching user sessions:", error.message);
      return [];
    }

    return (data ?? []).map(({ companions }) => companions);
  } catch (error) {
    console.error("Supabase connection error in getUserSessions:", error);
    return [];
  }
};

export const getUserCompanions = async (userId: string) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("companions")
      .select()
      .eq("author", userId);

    if (error) {
      console.error("Error fetching user companions:", error.message);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Supabase connection error in getUserCompanions:", error);
    return [];
  }
};

export const newCompanionPermissions = async () => {
  try {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if (has({ plan: "pro" })) {
      return true;
    } else if (has({ feature: "3_active_companions" })) {
      limit = 3;
    } else if (has({ feature: "10_active_companions" })) {
      limit = 10;
    }

    const { data, error } = await supabase
      .from("companions")
      .select("id", { count: "exact" })
      .eq("author", userId);

    if (error) {
      console.error("Error checking companion permissions:", error.message);
      return false;
    }

    const companionCount = data?.length ?? 0;

    return companionCount < limit;
  } catch (error) {
    console.error(
      "Supabase connection error in newCompanionPermissions:",
      error,
    );
    return false;
  }
};

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("bookmarks").insert({
      companion_id: companionId,
      user_id: userId,
    });
    if (error) {
      console.error("Error adding bookmark:", error.message);
      return null;
    }
    // Revalidate the path to force a re-render of the page
    revalidatePath(path);
    return data ?? null;
  } catch (error) {
    console.error("Supabase connection error in addBookmark:", error);
    return null;
  }
};

export const removeBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("companion_id", companionId)
      .eq("user_id", userId);
    if (error) {
      console.error("Error removing bookmark:", error.message);
      return null;
    }
    revalidatePath(path);
    return data ?? null;
  } catch (error) {
    console.error("Supabase connection error in removeBookmark:", error);
    return null;
  }
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching bookmarked companions:", error.message);
      return [];
    }
    // We don't need the bookmarks data, so we return only the companions
    return (data ?? []).map(({ companions }) => companions);
  } catch (error) {
    console.error(
      "Supabase connection error in getBookmarkedCompanions:",
      error,
    );
    return [];
  }
};
