"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { ADMIN_AUTH_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import { deleteAllResponses, deleteResponse } from "@/lib/db";

async function assertAdminSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isValidAdminSession(sessionValue)) {
    throw new Error("Unauthorized");
  }
}

export async function deleteSingleResponseAction(formData: FormData) {
  await assertAdminSession();

  const idValue = formData.get("id");
  const responseId = typeof idValue === "string" ? Number(idValue) : NaN;

  if (!Number.isFinite(responseId)) {
    throw new Error("Invalid response id.");
  }

  await deleteResponse(responseId);
  revalidatePath("/admin");
  revalidatePath("/admin/responses");
}

export async function deleteAllResponsesAction() {
  await assertAdminSession();
  await deleteAllResponses();
  revalidatePath("/admin");
  revalidatePath("/admin/responses");
}
