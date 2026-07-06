import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.comparisons.meta);
}

export default function ComparisonsHubPage() {
  const meta = clusterMeta.comparisons;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.comparisons.list}
      relatedClusters={nextClusterLinks.comparisons || []}
    />
  );
}
