param(
  [int]$Port = 8787
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$Listener.Start()

function Get-ContentType {
  param([string]$Path)
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8' }
    '.htm'  { 'text/html; charset=utf-8' }
    '.css'  { 'text/css; charset=utf-8' }
    '.js'   { 'application/javascript; charset=utf-8' }
    '.json' { 'application/json; charset=utf-8' }
    '.png'  { 'image/png' }
    '.jpg'  { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.gif'  { 'image/gif' }
    '.svg'  { 'image/svg+xml' }
    '.pdf'  { 'application/pdf' }
    '.ico'  { 'image/x-icon' }
    '.txt'  { 'text/plain; charset=utf-8' }
    default { 'application/octet-stream' }
  }
}

function Write-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType
  )
  $Header = @"
HTTP/1.1 $StatusCode $StatusText
Content-Type: $ContentType
Content-Length: $($Body.Length)
Connection: close
Cache-Control: no-store

"@
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
}

function Get-FileBytes {
  param([string]$FullPath)
  [System.IO.File]::ReadAllBytes($FullPath)
}

Write-Host "Serving $Root on http://127.0.0.1:$Port/"

try {
  while ($true) {
    $Client = $Listener.AcceptTcpClient()
    try {
      $Stream = $Client.GetStream()
      $Reader = New-Object System.IO.StreamReader($Stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $RequestLine = $Reader.ReadLine()
      if (-not $RequestLine) {
        continue
      }

      while ($true) {
        $Line = $Reader.ReadLine()
        if ($null -eq $Line -or $Line -eq '') { break }
      }

      $Parts = $RequestLine.Split(' ')
      $Method = $Parts[0]
      $RawPath = if ($Parts.Count -ge 2) { $Parts[1] } else { '/' }

      if ($Method -ne 'GET') {
        $Body = [System.Text.Encoding]::UTF8.GetBytes('Method Not Allowed')
        Write-Response -Stream $Stream -StatusCode 405 -StatusText 'Method Not Allowed' -Body $Body -ContentType 'text/plain; charset=utf-8'
        continue
      }

      $PathOnly = [Uri]::UnescapeDataString(($RawPath -split '\?')[0])
      if ([string]::IsNullOrWhiteSpace($PathOnly) -or $PathOnly -eq '/') {
        $PathOnly = '/index.html'
      }
      if ($PathOnly.EndsWith('/')) {
        $PathOnly = $PathOnly + 'index.html'
      }

      $Relative = $PathOnly.TrimStart('/') -replace '/', [System.IO.Path]::DirectorySeparatorChar
      $FullPath = Join-Path $Root $Relative

      if (Test-Path -LiteralPath $FullPath -PathType Leaf) {
        $Body = Get-FileBytes -FullPath $FullPath
        $ContentType = Get-ContentType -Path $FullPath
        Write-Response -Stream $Stream -StatusCode 200 -StatusText 'OK' -Body $Body -ContentType $ContentType
      } else {
        $Body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
        Write-Response -Stream $Stream -StatusCode 404 -StatusText 'Not Found' -Body $Body -ContentType 'text/plain; charset=utf-8'
      }
    } catch {
      try {
        $Body = [System.Text.Encoding]::UTF8.GetBytes('Internal Server Error')
        Write-Response -Stream $Stream -StatusCode 500 -StatusText 'Internal Server Error' -Body $Body -ContentType 'text/plain; charset=utf-8'
      } catch { }
    } finally {
      try { $Stream.Dispose() } catch { }
      try { $Client.Close() } catch { }
    }
  }
} finally {
  try { $Listener.Stop() } catch { }
}
