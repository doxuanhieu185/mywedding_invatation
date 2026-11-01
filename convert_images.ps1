# Script: Convert JPG -> SVG wrapper và thay thế ảnh repo gốc
# Chạy từ thư mục: C:\Users\THINKPAD\Documents\thiepcuoi\wedding

$docDir = "$PSScriptRoot\source\doc"

# Mapping: JPG (theo alphabet) -> tên SVG cần thay thế
$mapping = @(
    @{ jpg = "PQT08300.jpg"; svg = "back_thiep.svg" },
    @{ jpg = "PQT08372.jpg"; svg = "cam_anh.svg" },
    @{ jpg = "PQT08469.jpg"; svg = "xanh_chi.svg" },
    @{ jpg = "PQT08571.jpg"; svg = "xanh_1.svg" },
    @{ jpg = "PQT08617.jpg"; svg = "xanh_2.svg" },
    @{ jpg = "THCH0056.jpg"; svg = "xanh_3_lat.svg" },
    @{ jpg = "THCH0065.jpg"; svg = "xam_1.svg" },
    @{ jpg = "THCH0110.jpg"; svg = "xanh_hon.svg" },
    @{ jpg = "THCH0336.jpg"; svg = "cam_2.svg" },
    @{ jpg = "THCH9679.jpg"; svg = "xanh_3.svg" },
    @{ jpg = "THCH9680.jpg"; svg = "do.svg" },
    @{ jpg = "THCH9720.jpg"; svg = "cam_4.svg" },
    @{ jpg = "THCH9751.jpg"; svg = "xam_3.svg" },
    @{ jpg = "THCH9812.jpg"; svg = "xam_2.svg" },
    @{ jpg = "THCH9877.jpg"; svg = "cam_1.svg" },
    @{ jpg = "THCH9902.jpg"; svg = "cam_3.svg" },
    @{ jpg = "THCH9948.jpg"; svg = "cam_5.svg" },
    @{ jpg = "THCH9960.jpg"; svg = "cam_dep.svg" }
)

Write-Host "=== Bat dau convert JPG -> SVG ===" -ForegroundColor Cyan
$success = 0
$failed = 0

foreach ($item in $mapping) {
    $jpgPath = Join-Path $docDir $item.jpg
    $svgPath = Join-Path $docDir $item.svg

    if (-not (Test-Path $jpgPath)) {
        Write-Host "[SKIP] Khong tim thay: $($item.jpg)" -ForegroundColor Yellow
        $failed++
        continue
    }

    # Doc file JPG va encode sang Base64
    $jpgBytes = [System.IO.File]::ReadAllBytes($jpgPath)
    $base64 = [Convert]::ToBase64String($jpgBytes)

    # Lay kich thuoc anh bang System.Drawing
    Add-Type -AssemblyName System.Drawing
    $img = [System.Drawing.Image]::FromFile($jpgPath)
    $width = $img.Width
    $height = $img.Height
    $img.Dispose()

    # Tao SVG wrapper chua du lieu JPG duoi dang base64
    $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="$width" height="$height" viewBox="0 0 $width $height">
  <image width="$width" height="$height" href="data:image/jpeg;base64,$base64"/>
</svg>
"@

    # Xoa SVG cu neu ton tai
    if (Test-Path $svgPath) {
        Remove-Item $svgPath -Force
        Write-Host "[DEL] Da xoa SVG cu: $($item.svg)" -ForegroundColor DarkGray
    }

    # Ghi file SVG moi
    [System.IO.File]::WriteAllText($svgPath, $svgContent, [System.Text.Encoding]::UTF8)
    Write-Host "[OK]  $($item.jpg) -> $($item.svg) ($width x $height)" -ForegroundColor Green
    $success++
}

Write-Host ""
Write-Host "=== Hoan thanh: $success thanh cong, $failed that bai ===" -ForegroundColor Cyan

# Xoa cac file JPG goc sau khi da convert xong
Write-Host ""
Write-Host "=== Xoa file JPG goc ===" -ForegroundColor Cyan
foreach ($item in $mapping) {
    $jpgPath = Join-Path $docDir $item.jpg
    if (Test-Path $jpgPath) {
        Remove-Item $jpgPath -Force
        Write-Host "[DEL] Da xoa: $($item.jpg)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "=== Xong! Kiem tra lai thu muc: $docDir ===" -ForegroundColor Green
