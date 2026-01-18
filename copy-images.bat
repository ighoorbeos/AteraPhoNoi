@echo off
REM Script to copy images from ATERA folder to frontend public images

set SOURCE="E:\Semester9\BDS\ATERA PHỐ NỐI-20260118T135927Z-1-001\ATERA PHỐ NỐI"
set DEST="E:\Semester9\BDS\atera-landing-page\frontend\public\images"

echo Copying images from ATERA folder to frontend...

REM Copy overview/hero images
copy "%SOURCE%\ảnh\z7401615562705_18a39a55bd8883239ba6ff48c97e15e7.jpg" "%DEST%\hero-bg.jpg"
copy "%SOURCE%\ảnh\z7401615576461_e73fcd626b8bb3f0bfd0e2dae42d48fb.jpg" "%DEST%\overview-1.jpg"
copy "%SOURCE%\ảnh\z7401615588879_b699aa091a3a3fcd5dc40310be02c030.jpg" "%DEST%\overview-2.jpg"

REM Copy design images
copy "%SOURCE%\THIẾT KẾ\ảnh\Screenshot 2026-01-14 182945.png" "%DEST%\design-1.jpg"
copy "%SOURCE%\THIẾT KẾ\ảnh\Screenshot 2026-01-14 183039.png" "%DEST%\design-2.jpg"
copy "%SOURCE%\THIẾT KẾ\ảnh\Screenshot 2026-01-14 183433.png" "%DEST%\design-3.jpg"
copy "%SOURCE%\THIẾT KẾ\ảnh\Screenshot 2026-01-14 183447.png" "%DEST%\design-4.jpg"

REM Copy amenity images
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 170458.png" "%DEST%\amenity-pool.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 170808.png" "%DEST%\amenity-gym.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173127.png" "%DEST%\amenity-park.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173147.png" "%DEST%\amenity-school.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173235.png" "%DEST%\amenity-mall.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173246.png" "%DEST%\amenity-playground.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173307.png" "%DEST%\amenity-security.jpg"
copy "%SOURCE%\TIỆN ÍCH\ảnh\Screenshot 2026-01-14 173318.png" "%DEST%\amenity-clinic.jpg"

REM Copy gallery images
copy "%SOURCE%\ảnh\z7401613903000_0a6b284bb42a3672871e35a157bfc44c.jpg" "%DEST%\gallery-1.jpg"
copy "%SOURCE%\ảnh\z7401613903027_c76a00fe36dec0b9fbacd7b18a9e6f5c.jpg" "%DEST%\gallery-2.jpg"
copy "%SOURCE%\ảnh\z7401613903028_6c1a060538be5603c3377bd7e40656bd.jpg" "%DEST%\gallery-3.jpg"
copy "%SOURCE%\ảnh\z7401613903054_9124e07a5365866ac954de1e0c6d5a2d.jpg" "%DEST%\gallery-4.jpg"
copy "%SOURCE%\ảnh\z7401613937153_495a3b37e41c7355d1b9d51d045cc827.jpg" "%DEST%\gallery-5.jpg"
copy "%SOURCE%\ảnh\z7401615568039_ff6ce94effa78798235529012c40a386.jpg" "%DEST%\gallery-6.jpg"
copy "%SOURCE%\ảnh\z7401615582694_c09702d1194a3964795c156cc7f6937b.jpg" "%DEST%\gallery-7.jpg"
copy "%SOURCE%\ảnh\z7401615598213_0d4553e42bcdfa917f17a8073e159e67.jpg" "%DEST%\gallery-8.jpg"

REM Copy location image
copy "%SOURCE%\TỔNG QUAN\ảnh\Screenshot 2026-01-14 170409.png" "%DEST%\location-map.jpg"

REM Copy floorplan images
copy "%SOURCE%\ảnh\Screenshot 2026-01-14 173345.png" "%DEST%\floorplan-shophouse.jpg"
copy "%SOURCE%\ảnh\Screenshot 2026-01-14 173407.png" "%DEST%\floorplan-villa.jpg"
copy "%SOURCE%\ảnh\Screenshot 2026-01-14 173426.png" "%DEST%\floorplan-townhouse.jpg"

echo.
echo Images copied successfully!
echo.
pause
