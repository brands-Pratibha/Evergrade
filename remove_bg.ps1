Add-Type -AssemblyName System.Drawing

$assetsDir = "c:\Users\ASUS\.gemini\antigravity\scratch\evergrade\assets"
$icons = @("icon_mumbai.png", "icon_delhi.png", "icon_dubai.png", "icon_latvia.png")

foreach ($icon in $icons) {
    $path = Join-Path $assetsDir $icon
    if (Test-Path $path) {
        try {
            # Load the image
            $bmp = [System.Drawing.Bitmap]::FromFile($path)
            
            # Create a new bitmap to save (avoids file lock issues if saving over same file)
            $newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
            $g = [System.Drawing.Graphics]::FromImage($newBmp)
            $g.DrawImage($bmp, 0, 0, $bmp.Width, $bmp.Height)
            
            # Make white transparent
            $newBmp.MakeTransparent([System.Drawing.Color]::White)
            
            # Close original to release lock
            $bmp.Dispose()
            $g.Dispose()
            
            # Save
            $newBmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
            $newBmp.Dispose()
            
            Write-Host "Processed $icon"
        }
        catch {
            Write-Host "Error processing $icon : $_"
        }
    } else {
        Write-Host "File not found: $path"
    }
}
