import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.audiences.meta);
}

export default function AudiencesHubPage() {
  const meta = clusterMeta.audiences;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.audiences.list}
      relatedClusters={nextClusterLinks.audiences || []}
    />
  );
}
