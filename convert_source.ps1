$docDir = "C:\Users\THINKPAD\Documents\thiepcuoi\wedding\source"
Add-Type -AssemblyName System.Drawing

$mapping = @(
    @{ jpg = "dau.jpg"; svg = "dau.svg" },
    @{ jpg = "re.jpg";  svg = "re.svg"  }
)

foreach ($item in $mapping) {
    $jpgPath = Join-Path $docDir $item.jpg
    $svgPath = Join-Path $docDir $item.svg

    $jpgBytes = [System.IO.File]::ReadAllBytes($jpgPath)
    $base64 = [Convert]::ToBase64String($jpgBytes)

    $img = [System.Drawing.Image]::FromFile($jpgPath)
    $width = $img.Width
    $height = $img.Height
    $img.Dispose()

    $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="$width" height="$height" viewBox="0 0 $width $height">
  <image width="$width" height="$height" href="data:image/jpeg;base64,$base64"/>
</svg>
"@

    if (Test-Path $svgPath) {
        Remove-Item $svgPath -Force
        Write-Host "[DEL] Xoa SVG cu: $($item.svg)" -ForegroundColor DarkGray
    }

    [System.IO.File]::WriteAllText($svgPath, $svgContent, [System.Text.Encoding]::UTF8)
    Write-Host "[OK]  $($item.jpg) -> $($item.svg) ($width x $height)" -ForegroundColor Green

    Remove-Item $jpgPath -Force
    Write-Host "[DEL] Xoa JPG goc: $($item.jpg)" -ForegroundColor DarkGray
}

Write-Host "Xong!" -ForegroundColor Cyan
