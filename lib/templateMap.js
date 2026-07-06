import TemplateA from "@/templates/TemplateA";
import TemplateB from "@/templates/TemplateB";
// TODO: add TemplateC, TemplateD, TemplateE once ported

export const templateMap = {
  TemplateA,
  TemplateB,
};

export function getTemplate(name) {
  return templateMap[name] || TemplateA;
}
