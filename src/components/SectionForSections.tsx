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

      {/* <button className="border py-1 px-2 rounded-full bg-purple-800 text-fuchsia-50 capitalize text-base flex gap-1 items-center justify-center hover:bg-fuchsia-50 hover:text-purple-800 hover:border-purple-800">
            <UserCircleIcon className="h-5" />
            profile
          </button> */}
    </section>
  );
};
