/*
  Warnings:

  - Added the required column `pemanfaatan` to the `Tamu` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Tamu] ADD [dataLainnya] NVARCHAR(1000),
[pekerjaanLainnya] NVARCHAR(1000),
[pemanfaatan] NVARCHAR(1000) NOT NULL,
[pemanfaatanLainnya] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
