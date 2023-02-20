export function getUserByHandle(handle: string) {
  return app.prisma.user.findFirst({
    where: {
      handle,
    },
  });
}
