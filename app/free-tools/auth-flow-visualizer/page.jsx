import AuthFlowVisualizerClient from "./AuthFlowVisualizerClient";

export const metadata = {
  title: "Auth Flow Visualizer | JWT and OAuth Login Diagram",
  description:
    "Generate a JWT authentication flow diagram, OAuth login flow for Next.js, and step-by-step authentication request lifecycle.",
  alternates: {
    canonical: "https://sassypack.collabtower.com/free-tools/auth-flow-visualizer",
  },
};

export default function AuthFlowVisualizerPage() {
  return <AuthFlowVisualizerClient />;
}