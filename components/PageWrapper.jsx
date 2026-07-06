import { getTemplate } from "@/lib/templateMap";
import { buildSchema } from "@/lib/programmatic";

export default function PageWrapper({ data }) {
  const Template = getTemplate(data.template);
  const schema = buildSchema(data.meta?.description);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Template data={data} />
    </>
  );
}
