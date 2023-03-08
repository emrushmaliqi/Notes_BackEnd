export interface NoteObj {
  title: string;
  content: string;
  folder?: string;
}

export interface FolderObj {
  name: string;
  notes: NoteObj[];
}

export interface UserObj {
  email: string;
  password: string;
}
