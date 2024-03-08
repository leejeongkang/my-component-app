export type boardKey = "title" | "content" | "user";

export type Boards = {
  [key in boardKey]: string | null;
};

// title: string | null;
// content: string | null;
// user: string | null;
