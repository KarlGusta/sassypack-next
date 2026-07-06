import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.features.meta);
}

export default function FeaturesHubPage() {
  const meta = clusterMeta.features;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.features.list}
      relatedClusters={nextClusterLinks.features || []}
    />
  );
}
