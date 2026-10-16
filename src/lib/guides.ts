/**
 * The App Store guides at /guides: plain-language answers for founders who built an app
 * with Lovable, Bolt, Replit, v0 or Cursor and are trying to get it onto the iPhone.
 *
 * Written the way people search ("Apple says it's just a website"), not the way Apple
 * numbers its rules; the guideline number is a footnote. One typed source feeds the hub,
 * every guide page, their JSON-LD, the sitemap, and the /appstore chat's list of links.
 *
 * Body text supports one inline syntax, [label](/path), rendered as a link.
 */

export interface GuideSection {
  heading: string;
  body?: string[];
  /** Rendered as a numbered list after the body. */
  steps?: string[];
}

export interface Guide {
  slug: string;
  /** H1, in the reader's words. */
  title: string;
  /** <title>, 60 characters or fewer. */
  seoTitle: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  /** One-paragraph answer shown first. */
  short: string;
  /** Apple's name for it, shown as a footnote. */
  appleTerm?: string;
  sections: GuideSection[];
  /** What happened when shipping Beles or EBT Finder. */
  fromExperience?: string;
  faqs: { q: string; a: string }[];
  related: string[];
  group: "start" | "rejection";
}

/** Last full review of every guide against Apple's current rules. */
export const GUIDES_UPDATED = "2026-10-16";
export const GUIDES_UPDATED_LABEL = "October 16, 2026";

export const guides: Guide[] = [
  {
    slug: "lovable-app-to-app-store",
    group: "start",
    title: "How to get your Lovable app on the App Store",
    seoTitle: "How to Get Your Lovable App on the App Store (2026)",
    description:
      "Lovable builds web apps. Here's what it takes to turn one into an iPhone app Apple will approve: the account, the wrapper, what review checks, and timing.",
    short:
      "Lovable builds a web app, not an iPhone app. To get on the App Store you put your app inside a native iOS shell, add the things Apple expects from a real app, and submit it from an Apple Developer account. Most rejections come from skipping that middle step.",
    sections: [
      {
        heading: "What you need before you start",
        body: [
          "An Apple Developer account ($99 a year). If you enroll as a company, Apple asks for a D-U-N-S number, which can take days to weeks, so start that first.",
          "A privacy policy link, a support link, an app icon, and a demo login the reviewer can use. Screenshots come later, from the finished app.",
        ],
      },
      {
        heading: "Three ways to do it",
        body: [
          "**Use a wrapper service.** Tools like Median turn your URL into an app quickly for a monthly fee. Fast, but getting through review is still on you.",
          "**Do it yourself with Capacitor.** Free and flexible, if you're comfortable in Xcode and with native settings, certificates and builds.",
          "**Have someone do it.** You pay once and someone else handles the build, the listing and the back-and-forth with Apple. That's [the service I run](/appstore).",
        ],
      },
      {
        heading: "What Apple's reviewer checks",
        body: [
          "Whether it feels like an app or a website in a frame ([more on that](/guides/app-rejected-just-a-website)). Whether they can sign in and use it ([more](/guides/app-review-login-crash)). Whether people can delete their account ([more](/guides/app-store-account-deletion)), whether social login comes with a private option ([more](/guides/sign-in-with-apple-rejection)), and how you charge for things ([more](/guides/stripe-in-iphone-app)).",
        ],
      },
      {
        heading: "Can I keep building in Lovable?",
        body: [
          "Yes. Your Lovable project stays the source. What changes is shipping: if the app loads your live site, many content changes show up right away; if the code is bundled into the app, each change needs a new build. Anything native, like a new permission, always goes back through review.",
        ],
      },
    ],
    fromExperience:
      "I built Beles, a dating app, in Lovable. The first iOS build went up on September 10, 2026 and it was live in 175 countries on September 20. The surprises weren't the code: sign-in broke inside the app but not on the web, and because people post content, Apple expected reporting and blocking before it would look at anything else.",
    faqs: [
      {
        q: "Can Lovable publish to the App Store by itself?",
        a: "Not as of October 2026. Lovable builds web apps. Getting onto the App Store means wrapping that app in a native shell and submitting it through your own Apple Developer account.",
      },
      {
        q: "Do I need a Mac?",
        a: "Someone needs one to build the iOS app, or you can use a cloud build service. If someone builds it for you, you don't.",
      },
      {
        q: "Do I have to rebuild my app?",
        a: "No. The iPhone app is built from the code you already have, and your backend stays where it is.",
      },
      {
        q: "How long does it take?",
        a: "Usually one to two weeks. Most of that is waiting on your Apple account and on review, which usually takes a day or two.",
      },
    ],
    related: ["ai-app-builders-app-store", "app-rejected-just-a-website", "app-rejected-what-to-do"],
  },
  {
    slug: "ai-app-builders-app-store",
    group: "start",
    title: "Bolt, Replit, v0 and Cursor apps on the App Store",
    seoTitle: "Bolt, Replit, v0 and Cursor Apps on the App Store",
    description:
      "Built with Bolt, Replit, v0 or Cursor? What each tool gives you, whether you need a wrapper, and why a publish button doesn't mean Apple will approve it.",
    short:
      "It depends on what your tool produced. If it's a web app, the path is the same as for Lovable: wrap it and make it feel like a real app. If it made a native app, you skip the wrapper, but Apple's review rules apply exactly the same way.",
    sections: [
      {
        heading: "What each tool gives you",
        body: [
          "**Lovable and v0** build web apps, so they need a native shell to reach the App Store.",
          "**Bolt and Replit** build web apps by default and can also build native mobile apps with Expo. Replit has a button that sends a build to Apple.",
          "**Cursor or hand-written code** is whatever you wrote. A React site needs a shell; a React Native app doesn't.",
        ],
      },
      {
        heading: "A publish button isn't approval",
        body: [
          "One-click publishing gets your build to Apple. It doesn't get it approved. The reviewer still checks that people can sign in, delete their account, pay the right way, and that the screenshots match the app. Those are the reasons apps get sent back, whichever tool built them.",
        ],
      },
      {
        heading: "Which path is easier?",
        body: [
          "A native app is less likely to hear [\"it's just a website\"](/guides/app-rejected-just-a-website). A web app in a shell is faster to keep in sync with your site. Both get approved every day; what matters is fixing what the reviewer will look for before you submit.",
        ],
      },
    ],
    fromExperience:
      "EBT Finder is a React and Supabase web app in a Capacitor shell. It took 13 TestFlight builds to get right, and Apple rejected it once before it shipped. Almost none of that was about the tool; it was about the things a reviewer notices in the first minute.",
    faqs: [
      {
        q: "Do you work with Bolt, Replit and v0 apps?",
        a: "Yes. If it runs as a web app or a React Native app, it can usually become an iPhone app.",
      },
      {
        q: "Is a native app safer than a wrapped web app?",
        a: "It avoids one common rejection. Every other rule still applies.",
      },
    ],
    related: ["lovable-app-to-app-store", "app-rejected-what-to-do", "app-review-login-crash"],
  },
  {
    slug: "app-rejected-what-to-do",
    group: "start",
    title: "Apple rejected my app. What now?",
    seoTitle: "Apple Rejected My App: What to Do Next",
    description:
      "How to read an App Store rejection, decide whether to fix or reply, and resubmit without wasting a week. Plus the rejections AI-built apps get most.",
    short:
      "Read Apple's exact message, work out whether they want a change or just missed something, then fix it and resubmit with a short note. Most rejections are fixable in days.",
    sections: [
      {
        heading: "Step by step",
        steps: [
          "Open the message in App Store Connect. It names the rule and often includes screenshots of what the reviewer saw.",
          "Decide: does Apple want a change, or did the reviewer miss something? If they missed it, reply with clear steps or a short screen recording.",
          "If it needs a change, make it, bump the build number, and resubmit.",
          "Add a short note for the reviewer saying what changed and where to find it.",
          "Only appeal if you're sure Apple got it wrong. It's slower and rarely the first move.",
        ],
      },
      {
        heading: "The rejections AI-built apps get most",
        body: [
          "[\"It's just a website\"](/guides/app-rejected-just-a-website), [missing Sign in with Apple](/guides/sign-in-with-apple-rejection), [no way to delete an account](/guides/app-store-account-deletion), [the reviewer couldn't sign in or the app crashed](/guides/app-review-login-crash), and [charging through Stripe](/guides/stripe-in-iphone-app). They often arrive together, so fix the next one before Apple asks.",
        ],
      },
      {
        heading: "What not to do",
        body: [
          "Don't resubmit the same build hoping for a different reviewer. Don't hide features or switch things off during review; that's how developer accounts get closed. And don't argue: a calm, specific note works better.",
        ],
      },
    ],
    fromExperience:
      "Beles went in for review on September 12, 2026. I pulled one submission that had picked up an old build and resubmitted a clean one. It was released on September 20. Small mistakes cost days, not weeks, if you catch them early.",
    faqs: [
      {
        q: "How long does App Review take?",
        a: "Usually a day or two per submission. The fixing is what takes time.",
      },
      {
        q: "Will a rejection hurt my developer account?",
        a: "No. Rejections are normal. What hurts is hiding things from the reviewer or resubmitting without changes.",
      },
    ],
    related: ["app-rejected-just-a-website", "sign-in-with-apple-rejection", "app-review-login-crash"],
  },
  {
    slug: "app-rejected-just-a-website",
    group: "rejection",
    title: "Apple rejected my app for being \"just a website\"",
    seoTitle: "Apple Rejected My App for Being \"Just a Website\"",
    description:
      "Why Apple rejects apps that feel like a website in a frame, and what fixes it: native navigation, offline behavior, and a clear note to the reviewer.",
    short:
      "Apple doesn't want apps that are a website in a frame. Arguing rarely works. What works is adding things a browser can't do, removing the parts that feel like a website, and telling the reviewer exactly where to look.",
    appleTerm: "Guideline 4.2, Minimum Functionality",
    sections: [
      {
        heading: "What the reviewer saw",
        body: [
          "Usually some mix of: a web-style menu or footer, links that open web pages, no response when the phone is offline, pull-to-refresh like Safari, and nothing an iPhone app would do that a website couldn't.",
        ],
      },
      {
        heading: "How to fix it",
        steps: [
          "Replace the web menu with a native tab bar.",
          "Add a real offline screen instead of a browser error.",
          "Add native touches that fit your app: push notifications, haptics, the share sheet, the camera.",
          "Remove website leftovers: footers, \"open in browser\" links, cookie banners.",
          "In your note to the reviewer, list each native feature and where to find it.",
        ],
      },
      {
        heading: "When it isn't fixable",
        body: [
          "If the app is mostly static content, like a brochure or a blog, Apple is unlikely to accept it however it's wrapped. Better to know that before you pay anyone.",
        ],
      },
    ],
    fromExperience:
      "Before submitting Beles I rebuilt its main screens around native patterns: a tab bar, native sheets, Sign in with Apple. The reviewer's first minute in an app decides a lot.",
    faqs: [
      {
        q: "Can I just reply and explain?",
        a: "Rarely, unless the reviewer missed native features that are already there. Most of the time Apple wants to see a changed build.",
      },
      {
        q: "How long does the fix take?",
        a: "Usually days, not weeks, if the app does something useful.",
      },
    ],
    related: ["app-rejected-what-to-do", "lovable-app-to-app-store", "sign-in-with-apple-rejection"],
  },
  {
    slug: "sign-in-with-apple-rejection",
    group: "rejection",
    title: "Apple says my app needs Sign in with Apple",
    seoTitle: "Apple Says My App Needs Sign in with Apple",
    description:
      "If your app offers Google or another social login, Apple requires a private login option too. Who it applies to, and how to add Sign in with Apple.",
    short:
      "If people can sign in with Google, Facebook or another social account, Apple requires an equivalent option that lets them keep their email private and doesn't track them. Sign in with Apple is the standard way to meet that.",
    appleTerm: "Guideline 4.8, Login Services",
    sections: [
      {
        heading: "Who it applies to",
        body: [
          "Apps that use social login to create or sign into an account. If you only offer email and password, it doesn't apply. Apps that only work with an existing company or school account are usually exempt.",
        ],
      },
      {
        heading: "How to fix it",
        steps: [
          "Turn on the Apple option in your sign-in provider (Supabase, Firebase and Clerk all have one) using keys from your Apple Developer account.",
          "Add the Sign in with Apple button next to the others, the same size and just as easy to find.",
          "Set it up natively in the iOS app. The web button doesn't carry over by itself.",
          "Test it on a real iPhone before you submit.",
        ],
      },
    ],
    fromExperience:
      "On Beles the web sign-in worked fine, but the iPhone app needed its own setup for Sign in with Apple. I caught it after launch and fixed it in the next update. Now I test it on a real device before every submission.",
    faqs: [
      {
        q: "Do I have to remove Google sign-in?",
        a: "No. Keep it. Apple just wants a private option next to it.",
      },
      {
        q: "What will Apple ask for next?",
        a: "Often account deletion. If people can create an account, they need to be able to [delete it in the app](/guides/app-store-account-deletion).",
      },
    ],
    related: ["app-store-account-deletion", "app-review-login-crash", "app-rejected-what-to-do"],
  },
  {
    slug: "app-store-account-deletion",
    group: "rejection",
    title: "Apple wants a \"delete account\" option in my app",
    seoTitle: "Apple Wants a Delete Account Option in My App",
    description:
      "If people can create an account in your app, Apple requires a way to delete it inside the app. What counts, where it goes, and what to tell the reviewer.",
    short:
      "If people can create an account in your app, they have to be able to delete it from inside the app. An \"email us to delete\" link or a web form usually isn't enough.",
    appleTerm: "Guideline 5.1.1(v), Account Deletion",
    sections: [
      {
        heading: "What Apple expects",
        body: [
          "A clear Delete account option, usually in Settings or Profile, that actually deletes the account and its data. A confirmation step is fine. If the law makes you keep some records, say so in the app.",
        ],
      },
      {
        heading: "How to fix it",
        steps: [
          "Add Delete account to Settings or Profile.",
          "Delete the account and its data on the server. With Supabase or Firebase this needs a small server function, because the app itself can't remove users.",
          "If people use Sign in with Apple, revoke their Apple sign-in as part of deleting.",
          "Tell the reviewer where to find it in your note.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I just deactivate the account?",
        a: "Not if you call it deletion. Apple expects the account and its data to actually go.",
      },
      {
        q: "Does this apply if there's no sign-up?",
        a: "No. It only applies to apps where people create an account.",
      },
    ],
    related: ["sign-in-with-apple-rejection", "app-rejected-what-to-do", "app-review-login-crash"],
  },
  {
    slug: "stripe-in-iphone-app",
    group: "rejection",
    title: "Can I keep Stripe payments in my iPhone app?",
    seoTitle: "Can I Keep Stripe Payments in My iPhone App?",
    description:
      "When Stripe is fine in an iPhone app, when Apple expects in-app purchase, and what's changed in the US. Plain answers, dated October 2026.",
    short:
      "It depends on what you sell. Physical goods and real-world services can keep Stripe. Digital things used in the app, like subscriptions, premium features or credits, generally have to use Apple's in-app purchase. In the US, apps can now also link out to pay on the web, but the fee Apple may charge for that is still being decided in court.",
    appleTerm: "Guideline 3.1.1, In-App Purchase",
    sections: [
      {
        heading: "Stripe is fine for",
        body: [
          "Physical products, food delivery, rides, bookings, in-person services, and payments between people. Anything consumed outside the app.",
        ],
      },
      {
        heading: "Apple expects in-app purchase for",
        body: [
          "Subscriptions, premium features, credits, and digital content used inside the app. RevenueCat makes this much easier to set up. Apple's fee is 15% for most small developers and 30% otherwise.",
        ],
      },
      {
        heading: "If you already have paying users",
        body: [
          "Moving them over takes care: people who paid on the web should keep their access in the app. That means checking access in your backend, not only in the store.",
        ],
      },
      {
        heading: "One thing never to do",
        body: [
          "Don't hide the paywall from the reviewer and switch it on after approval. It's the quickest way to lose a developer account.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can US apps link out to a web checkout now?",
        a: "Yes, after the Epic v. Apple rulings. What Apple can charge on those purchases is still being decided in court as of October 2026, so check the current rules before you build around it.",
      },
      {
        q: "Is this legal advice?",
        a: "No. It's how Apple reviews apps today, from shipping them. The rules are moving, so check Apple's current guidelines for your case.",
      },
    ],
    related: ["app-rejected-what-to-do", "lovable-app-to-app-store", "app-store-account-deletion"],
  },
  {
    slug: "app-review-login-crash",
    group: "rejection",
    title: "Apple says the app crashed or they couldn't sign in",
    seoTitle: "Apple Says My App Crashed or They Couldn't Sign In",
    description:
      "Why App Review can't sign in or sees a crash when your app works for you, and the fix: demo accounts, real-device testing, and a common redirect trap.",
    short:
      "The reviewer couldn't use your app. Usually that's a missing or broken demo account, a crash on their device, or a sign-in that works in a browser but fails inside the app.",
    appleTerm: "Guideline 2.1, App Completeness",
    sections: [
      {
        heading: "How to fix it",
        steps: [
          "Add a demo account in App Store Connect under App Review Information, with two-factor turned off and sample data inside.",
          "Test on a real iPhone through TestFlight, not just the simulator or a browser.",
          "Check the crash report Apple attached, or the crash logs in App Store Connect.",
          "Point the app at your final web address. Inside an app, a redirect that browsers follow quietly can break sign-in.",
          "Make sure nothing the reviewer needs is switched off, region-locked or invite-only.",
        ],
      },
    ],
    fromExperience:
      "The first Beles build called a web address that redirects. Browsers follow that without anyone noticing; the iPhone app didn't, so sign-in failed. The fix was one line: point the app at the final address. It shipped in build 2.",
    faqs: [
      {
        q: "It works on my phone. Why not theirs?",
        a: "Reviewers use a fresh device, a fresh account and often a different network. Test it the way they will: new install, demo account, TestFlight.",
      },
    ],
    related: ["app-rejected-what-to-do", "sign-in-with-apple-rejection", "app-rejected-just-a-website"],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

export const guidePath = (slug: string) => `/guides/${slug}`;

/** Strip the [label](/path) and **bold** syntax for meta tags and JSON-LD. */
export const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
