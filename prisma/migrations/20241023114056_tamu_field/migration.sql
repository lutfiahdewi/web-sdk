/*
  Warnings:

  - You are about to drop the column `Selesai` on the `Tamu` table. All the data in the column will be lost.
  - Added the required column `Status` to the `Tamu` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Tamu] DROP COLUMN [Selesai];
ALTER TABLE [dbo].[Tamu] ADD [Status] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
