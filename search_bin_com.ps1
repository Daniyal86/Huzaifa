$shell = New-Object -ComObject Shell.Application
$recycleBin = $shell.Namespace(10)
Write-Host "Searching Recycle Bin..."
foreach ($item in $recycleBin.Items()) {
    $path = $item.Path
    $name = $item.Name
    if ($path -like "*Huzaifa*" -or $name -like "*index*" -or $name -like "*style*") {
        Write-Host "Match: Name: $name | Path: $path"
        # If it is a folder, let's explore its children
        try {
            $folder = $recycleBin.Namespace($item)
            if ($folder) {
                foreach ($subitem in $folder.Items()) {
                    Write-Host "  Subitem: $($subitem.Name) | $($subitem.Path)"
                }
            }
        } catch {
            Write-Host "  Error reading subfolder"
        }
    }
}
Write-Host "Search finished."
