import ClusterPage from "@/components/ClusterPage";
import { stacksAll, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.stacks.meta);
}

export default function StacksHubPage() {
  const meta = clusterMeta.stacks;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={stacksAll}
      relatedClusters={nextClusterLinks.stacks || []}
    />
  );
}
