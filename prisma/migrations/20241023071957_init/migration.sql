BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Sarana] (
    [saranaId] INT NOT NULL IDENTITY(1,1),
    [sNama] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Sarana_pkey] PRIMARY KEY CLUSTERED ([saranaId])
);

-- CreateTable
CREATE TABLE [dbo].[Data] (
    [dataId] INT NOT NULL IDENTITY(1,1),
    [dNama] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Data_pkey] PRIMARY KEY CLUSTERED ([dataId])
);

-- CreateTable
CREATE TABLE [dbo].[Pegawai] (
    [pegawaiId] INT NOT NULL IDENTITY(1,1),
    [pNama] NVARCHAR(1000) NOT NULL,
    [NIP] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Pegawai_pkey] PRIMARY KEY CLUSTERED ([pegawaiId]),
    CONSTRAINT [Pegawai_NIP_key] UNIQUE NONCLUSTERED ([NIP])
);

-- CreateTable
CREATE TABLE [dbo].[Tamu] (
    [tamuId] INT NOT NULL IDENTITY(1,1),
    [tNama] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [nomer] NVARCHAR(1000) NOT NULL,
    [keperluan] NVARCHAR(1000) NOT NULL,
    [keperluanDetail] NVARCHAR(1000) NOT NULL,
    [pekerjaan] NVARCHAR(1000) NOT NULL,
    [kategoriInstansi] NVARCHAR(1000) NOT NULL,
    [namaInstansi] NVARCHAR(1000) NOT NULL,
    [saranaId] INT NOT NULL,
    [dataId] INT NOT NULL,
    [dataDetail] NVARCHAR(1000) NOT NULL,
    [noAntrian] INT NOT NULL,
    [pegawaiId] INT NOT NULL,
    [Bukti] NVARCHAR(1000) NOT NULL,
    [Selesai] BIT NOT NULL,
    CONSTRAINT [Tamu_pkey] PRIMARY KEY CLUSTERED ([tamuId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Tamu] ADD CONSTRAINT [Tamu_saranaId_fkey] FOREIGN KEY ([saranaId]) REFERENCES [dbo].[Sarana]([saranaId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tamu] ADD CONSTRAINT [Tamu_dataId_fkey] FOREIGN KEY ([dataId]) REFERENCES [dbo].[Data]([dataId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tamu] ADD CONSTRAINT [Tamu_pegawaiId_fkey] FOREIGN KEY ([pegawaiId]) REFERENCES [dbo].[Pegawai]([pegawaiId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
