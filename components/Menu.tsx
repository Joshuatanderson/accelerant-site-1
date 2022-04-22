import React, { useRef } from "react";
import Button from "@mui/material/Button";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
interface Page {
  display: string;
  slug: string;
  id: string;
}

const pages: Page[] = [
  {
    display: "About",
    slug: "about",
    id: "ce883664-8fdf-4a2a-9e41-ee5e774111ed",
  },
  {
    display: "Contact",
    slug: "contact",
    id: "8226722c-bdf0-4256-8696-23a25af1a2fc",
  },
  {
    display: "Blog",
    slug: "blog",
    id: "1d00cee1-9b38-41d5-a783-3245136a08ee",
  },
];

export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const makePages = (pages: Page[]) => {
    return pages.map((page) => {
      return (
        <Link href={`/${page.slug}`} key={page.id}>
          <MenuItem>{page.display}</MenuItem>
        </Link>
      );
    });
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e)}
      >
        <MenuIcon />
      </Button>
      {anchorEl && (
        <MuiMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          onClick={() => handleClose()}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {makePages(pages)}
        </MuiMenu>
      )}
    </>
  );
}
