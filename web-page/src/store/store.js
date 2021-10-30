import { writable } from "svelte/store";

export const TextUpload = writable("");
export const Waiting = writable(false);
export const Authors = writable([]);
export const onlyShow = writable([]);