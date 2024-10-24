/*
  Warnings:

  - You are about to drop the column `Bukti` on the `Tamu` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Tamu` table. All the data in the column will be lost.
  - Added the required column `status` to the `Tamu` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Tamu] DROP CONSTRAINT [Tamu_dataId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Tamu] DROP CONSTRAINT [Tamu_pegawaiId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [keperluanDetail] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [kategoriInstansi] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [namaInstansi] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [dataId] INT NULL;
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [dataDetail] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Tamu] ALTER COLUMN [pegawaiId] INT NULL;
ALTER TABLE [dbo].[Tamu] DROP COLUMN [Bukti],
[Status];
ALTER TABLE [dbo].[Tamu] ADD [bukti] NVARCHAR(1000),
[status] BIT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Tamu] ADD CONSTRAINT [Tamu_dataId_fkey] FOREIGN KEY ([dataId]) REFERENCES [dbo].[Data]([dataId]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tamu] ADD CONSTRAINT [Tamu_pegawaiId_fkey] FOREIGN KEY ([pegawaiId]) REFERENCES [dbo].[Pegawai]([pegawaiId]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
