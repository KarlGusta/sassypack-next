export const defaultOgImage = "https://res.cloudinary.com/drrz635x0/image/upload/v1761929593/Generated_Image_October_31_2025_-_7_50PM_zzaqym.png";

export const rawPosts = [
    {
    slug: "launch-your-saas-in-days-not-months",
    title: "Launch Your SaaS in Days, Not Months, With SassyPack",
    date: "2025-10-24",
    category: "Fundamentals of SaaS Starter Kits",
    description:
      "Skip the boring setup. Build and launch your SaaS faster with SassyPack, the full Nextjs starter kit for indie devs and founders.",
    content: `

Building a SaaS app shouldn't take forever.  
With **[SassyPack](https://karlgusta.gumroad.com/l/mlixgb?wanted=true)**, you can go from idea → live product in **days**, not months.

Forget wiring up authentication, payments, analytics, and dashboards from scratch.  
SassyPack gives you everything you need to launch, already built, styled, and production-ready.

---

## What You Get

- Authentication (JWT + OAuth ready)  
- Payments via **Stripe + Paystack**  
- Analytics dashboard  
- Modern landing page template  
- Lifetime updates (Pro plan)  

Everything is plug-and-play, no need to wrestle with setup files or boilerplate code.

---

## Built for Makers, Not Just Developers

Whether you're a solo dev, startup founder, or beginner, SassyPack helps you focus on what really matters, **your product and customers.**

It’s designed to help you:
- Build MVPs fast  
- Validate ideas before coding too much  
- Iterate with real users early  

---

## Why SassyPack?

Because building from scratch is slow and repetitive.  
You shouldn’t have to rebuild authentication, payments, or user dashboards every time you start a new idea.  

SassyPack cuts through the clutter so you can:
- Launch faster  
- Learn faster  
- Earn faster  

---

### Starter vs. Pro

**Starter ($29)**  
Perfect for learners and indie devs testing ideas.  
Includes 3 months of free updates.  

**Pro ($79)** (Most Popular)  
Lifetime updates + Early Access to new templates.  
Perfect for serious makers and founders.

---

### Get It Now

Stop rebuilding from scratch.  
Start building what matters.

[Get SassyPack on Gumroad →](https://karlgusta.gumroad.com/l/mlixgb?wanted=true)

Your next SaaS launch could be **this weekend**.
`
  },
];

// 👇 Automatically adds the OG image to every post
export const blogPosts = rawPosts.map(post => ({
  ...post,
  image: defaultOgImage
}));