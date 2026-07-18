import StripeSubscriptionSetupCheckerClient from "./StripeSubscriptionSetupCheckerClient";

export const metadata = {
  title: "Stripe Subscription Setup Checker | Free Webhook Checker",
  description:
    "Check your Stripe subscription setup for missing webhooks, Checkout misconfigurations, and recommended Next.js integration flow.",
  keywords: [
    "Stripe subscription setup guide",
    "Stripe webhook checker",
    "Stripe checkout integration Next.js",
    "Stripe subscription setup",
  ],
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/stripe-subscription-setup-checker",
  },
};

export default function StripeSubscriptionSetupCheckerPage() {
  return <StripeSubscriptionSetupCheckerClient />;
}
