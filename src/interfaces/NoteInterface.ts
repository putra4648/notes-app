interface NoteInterface {
  readonly id: string;
  readonly name: string;
  readonly create_at: Date;
  readonly update_at: Date;
  readonly is_done: boolean;
}

export default NoteInterface;
