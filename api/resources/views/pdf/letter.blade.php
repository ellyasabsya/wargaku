<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Keterangan</title>
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 14px; line-height: 1.5; }
        .header { text-align: center; border-bottom: 3px solid black; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; }
        .header h2 { margin: 5px 0; font-size: 16px; text-transform: uppercase; }
        .header p { margin: 0; font-size: 12px; }
        .title { text-align: center; font-weight: bold; text-decoration: underline; font-size: 18px; margin-bottom: 30px; letter-spacing: 1px; }
        .content { margin-bottom: 30px; }
        .content table { width: 100%; }
        .content td { vertical-align: top; padding: 4px 0; }
        .content td:first-child { width: 150px; font-weight: bold; }
        .footer { margin-top: 50px; width: 100%; }
        .signature { float: right; text-align: center; width: 200px; }
        .signature p { margin: 0; }
        .signature .name { margin-top: 70px; font-weight: bold; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <h1>PENGURUS RT 03 / RW 05</h1>
        <h2>PERUMAHAN TAMAN INDAH</h2>
        <p>Jl. Merdeka No. 123, Kecamatan Sukamaju, Kota Sejahtera</p>
    </div>

    <div class="title">SURAT KETERANGAN</div>

    <div class="content">
        <p>Yang bertanda tangan di bawah ini, Ketua RT 03 / RW 05 Perumahan Taman Indah, dengan ini menerangkan bahwa:</p>
        
        <table>
            <tr>
                <td>Nama Lengkap</td>
                <td>: {{ $letter->user->name }}</td>
            </tr>
            <tr>
                <td>Jenis Surat</td>
                <td>: {{ $letter->letter_type }}</td>
            </tr>
            <tr>
                <td>Keperluan</td>
                <td>: {{ $letter->purpose }}</td>
            </tr>
        </table>

        <p style="margin-top: 20px;">Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
    </div>

    <div class="footer">
        <div class="signature">
            <p>Sejahtera, {{ date('d F Y') }}</p>
            <p>Ketua RT 03</p>
            <p class="name">H. Ahmad Subarjo</p>
        </div>
    </div>
</body>
</html>
