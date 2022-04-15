import { SpaceBarRounded } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout(props: any) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/blog";

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href="/blog">
        <a className="text-6xl font-black text-black no-underline">Blog</a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2">
      <Link href="/blog">
        <a className="text-2xl font-black text-black no-underline">Blog</a>
      </Link>
    </h1>
  );

  return (
    <div className="max-w-screen-sm px-4 py-8 mx-auto">
      <header>{header}</header>
      <main>{props.children}</main>
      <footer>© {new Date().getFullYear()}, Built with &#10084;</footer>
    </div>
  );
}
