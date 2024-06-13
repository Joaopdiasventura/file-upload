import { JsonValue } from "@prisma/client/runtime/library";

export class File {
	id: string;
	name: string;
	metadata: JsonValue;
}
