import {
  DocumentTextIcon,
  PlusCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { ButtonForSection } from "./ButtonForSection";

export const SectionForSections = () => {
  return (
    <section className="w-full flex gap-4 justify-center">
      <ButtonForSection>
        <DocumentTextIcon className="h-6" />
        notes
      </ButtonForSection>
      <ButtonForSection>
        <PlusCircleIcon className="h-6" />
        new note
      </ButtonForSection>
      <ButtonForSection>
        <PlusCircleIcon className="h-6" />
        new tag
      </ButtonForSection>
      <ButtonForSection>
        <TagIcon className="h-6" />
        tags
      </ButtonForSection>
    </section>
  );
};
