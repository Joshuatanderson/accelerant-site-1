import { SanityDocument } from "@sanity/client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { Code } from "../components/Code";
import Sandbox from "../components/Sandbox";
import VideoBlogPost from "../components/VideoBlogPost";
import { client } from "./sanity";

export const portableTextComponents = {
  types: {
    videoBlogPost: (document: SanityDocument) => {
      return <VideoBlogPost document={document} />;
    },
    // code: (document: any) => <Code document={document} />,
    image: (document: SanityDocument) => {
      const imageProps: any = useNextSanityImage(
        client,
        document?.value?.asset
      );

      // const imageProps = useNextSanityImage(client, post?.mainImage);

      return <Image {...imageProps} width={1} height={1} layout="responsive" />;
    },
    codeExtended: (document: SanityDocument) => {
      if (document?.value?.isSandbox) {
        return (
          <Sandbox isP5={true} />

          // <Sandbox
          //   language={document?.value?.code?.language}
          //   initialCode={document?.value?.code?.code}
          //   file={document?.value?.file}
          //   isP5={document?.value?.isP5}
          // />
        );
      } else {
        return (
          <Code
            code={document?.value?.code?.code}
            lang={document?.value?.code?.language}
          />
        );
      }
    },
    // backwards compatible. Remove eventually and replace with codeExtended
    code: (document: SanityDocument) => {
      return <Code code={document?.value?.code} />;
    },
    undefined: (document: any) => {
      {
        console.warn("undefined type");
        return null;
      }
    },
  },
};
