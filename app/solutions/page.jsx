import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.solutions.meta);
}

export default function SolutionsHubPage() {
  const meta = clusterMeta.solutions;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.solutions.list}
      relatedClusters={nextClusterLinks.solutions || []}
    />
  );
}
