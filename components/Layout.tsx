import { SpaceBarRounded } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  rootPath: string; // pathname for the redirect option
}

export default function Layout({ title, children, rootPath }: LayoutProps) {
  const { pathname } = useRouter();
  const isRoot = pathname === rootPath;

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href={rootPath}>
        <a className="text-6xl font-black text-black no-underline">{title}</a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2">
      <Link href={rootPath}>
        <a className="text-2xl font-black text-black no-underline">{title}</a>
      </Link>
    </h1>
  );

  return (
    <div className="max-w-screen-sm px-4 py-8 mx-auto">
      <header>{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Built with &#10084;</footer>
    </div>
  );
}
