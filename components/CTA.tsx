import Image from "next/image";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Now</div>
      <h2 className="text-3xl font-bold">
        Build And Personlize Your Companions Now!!!
      </h2>
      <p>
        Unlock your potential with AI-powered companions tailored to your needs.
        Start your journey today!
      </p>
      <Image
        src={"images/cta.svg"}
        alt="CTA Image"
        width={500}
        height={300}
        className="cta-image"
      />
      <button className="btn-primary ">
        <Image src={"icons/plus.svg"} alt="plus" width={12} height={12} />
        <Link href={"/companions/new"}>
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
