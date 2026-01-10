$projectPath = $PSScriptRoot


$files = Get-ChildItem -Path $projectPath -Recurse -Include "*.js","*.css","*.html" -File | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "dist" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    
    $newContent = $content -replace '\./images/', '/images/'
    $newContent = $newContent -replace '\./videos/', '/videos/'
    $newContent = $newContent -replace '\./fonts/', '/fonts/'
    
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Corrigido: $($file.Name)"
    }
}

Write-Host "Concluído!"
