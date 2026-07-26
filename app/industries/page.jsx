import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.industries.meta);
}

export default function IndustriesHubPage() {
  const meta = clusterMeta.industries;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.industries.list}
      relatedClusters={nextClusterLinks.industries || []}
    />
  );
}
