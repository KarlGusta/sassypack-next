import ClusterPage from "@/components/ClusterPage";
import { clusters, buildMetadata } from "@/lib/programmatic";
import { clusterMeta, nextClusterLinks } from "@/lib/clusterMeta";

export async function generateMetadata() {
  return buildMetadata(clusterMeta.usecases.meta);
}

export default function UsecasesHubPage() {
  const meta = clusterMeta.usecases;
  return (
    <ClusterPage
      title={meta.title}
      description={meta.description}
      pages={clusters.usecases.list}
      relatedClusters={nextClusterLinks.usecases || []}
    />
  );
}
