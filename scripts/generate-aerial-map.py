# Procedural satellite-style aerial map for the hero search panel.
# Usage: python3 scripts/generate-aerial-map.py public/map-aerial.webp
import random, math, sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops

random.seed(7)
W, H = 1400, 640
img = Image.new("RGB", (W, H), (74, 78, 66))
d = ImageDraw.Draw(img)

# ground texture: patchy dirt / grass
for _ in range(2600):
    x, y = random.randint(0, W), random.randint(0, H)
    r = random.randint(6, 40)
    c = random.choice([(82, 86, 70), (70, 74, 60), (90, 88, 72), (66, 72, 58), (96, 94, 80)])
    d.ellipse((x - r, y - r, x + r, y + r), fill=c)
img = img.filter(ImageFilter.GaussianBlur(10))
d = ImageDraw.Draw(img)

ROAD = (58, 60, 62)
# road layout: vertical streets and horizontal streets (in px)
vstreets = [(150, 26), (520, 34), (905, 26), (1225, 30)]
hstreets = [(120, 26), (470, 30)]
# main curved avenue
def avenue_y(x):
    return 300 + 55 * math.sin(x / 260.0) - 0.05 * x

roads = Image.new("L", (W, H), 0)
rd = ImageDraw.Draw(roads)
for x, w in vstreets:
    rd.rectangle((x - w // 2, 0, x + w // 2, H), fill=255)
for y, w in hstreets:
    rd.rectangle((0, y - w // 2, W, y + w // 2), fill=255)
for x in range(0, W, 2):
    y = avenue_y(x)
    rd.ellipse((x - 26, y - 26, x + 26, y + 26), fill=255)

# blocks: fill everything not road with buildings or parks
park = (560, 140, 870, 250)  # a park block
block_mask = ImageChops.invert(roads)

roof_tones = [(196, 190, 176), (176, 172, 164), (212, 206, 194), (150, 146, 140), (184, 120, 92),
              (166, 104, 82), (226, 222, 214), (132, 130, 128), (200, 186, 160), (120, 118, 112)]
buildings = Image.new("RGB", (W, H), (0, 0, 0))
bmask = Image.new("L", (W, H), 0)
bd = ImageDraw.Draw(buildings)
bm = ImageDraw.Draw(bmask)
for _ in range(950):
    w, h = random.randint(26, 64), random.randint(22, 54)
    x, y = random.randint(-20, W), random.randint(-20, H)
    if park[0] - 10 < x < park[2] and park[1] - 10 < y < park[3]:
        continue
    c = random.choice(roof_tones)
    jitter = random.randint(-10, 10)
    c = tuple(max(0, min(255, v + jitter)) for v in c)
    # shadow to the south-east
    bd.rectangle((x + 5, y + 5, x + w + 5, y + h + 5), fill=(38, 40, 38))
    bm.rectangle((x + 5, y + 5, x + w + 5, y + h + 5), fill=255)
    bd.rectangle((x, y, x + w, y + h), fill=c)
    # roof ridge / edge highlight
    bd.line((x, y, x + w, y), fill=tuple(min(255, v + 25) for v in c), width=2)
    bd.line((x, y, x, y + h), fill=tuple(min(255, v + 15) for v in c), width=2)
    # rooftop details: water tanks / AC units
    for _ in range(random.randint(0, 3)):
        tx, ty = x + random.randint(3, max(4, w - 9)), y + random.randint(3, max(4, h - 9))
        if random.random() < 0.5:
            bd.ellipse((tx, ty, tx + 7, ty + 7), fill=(30, 32, 34))
        else:
            bd.rectangle((tx, ty, tx + 8, ty + 5), fill=(235, 235, 230))
    bm.rectangle((x, y, x + w, y + h), fill=255)
bmask = ImageChops.multiply(bmask, block_mask)
img.paste(buildings, (0, 0), bmask)

# park with trees
d = ImageDraw.Draw(img)
d.rounded_rectangle(park, radius=10, fill=(78, 104, 62))
for _ in range(90):
    x = random.randint(park[0] + 8, park[2] - 8)
    y = random.randint(park[1] + 8, park[3] - 8)
    r = random.randint(7, 15)
    d.ellipse((x - r + 3, y - r + 3, x + r + 3, y + r + 3), fill=(40, 52, 34))
    d.ellipse((x - r, y - r, x + r, y + r), fill=random.choice([(58, 88, 46), (66, 98, 52), (52, 80, 42)]))
    d.ellipse((x - r // 2, y - r // 2 - 2, x + r // 3, y), fill=(92, 124, 70))
# a footpath through the park
d.line((park[0], park[3] - 20, park[2], park[1] + 25), fill=(170, 160, 136), width=5)

# street trees along roads
for _ in range(240):
    x, y = random.randint(0, W), random.randint(0, H)
    if roads.getpixel((min(W - 1, x), min(H - 1, y))) == 0:
        near = any(roads.getpixel((min(W - 1, max(0, x + dx)), min(H - 1, max(0, y + dy)))) for dx, dy in [(14, 0), (-14, 0), (0, 14), (0, -14)])
        if near:
            r = random.randint(5, 9)
            d.ellipse((x - r + 2, y - r + 2, x + r + 2, y + r + 2), fill=(36, 44, 32))
            d.ellipse((x - r, y - r, x + r, y + r), fill=random.choice([(62, 92, 48), (72, 102, 56)]))

# roads on top
road_layer = Image.new("RGB", (W, H), ROAD)
img.paste(road_layer, (0, 0), roads.filter(ImageFilter.GaussianBlur(0.8)))
d = ImageDraw.Draw(img)
# sidewalks edge (lighter outline)
edge = roads.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(3))
img.paste(Image.new("RGB", (W, H), (150, 148, 140)), (0, 0), edge.point(lambda v: 140 if v > 40 else 0))
# lane markings
for x, w in vstreets:
    for y in range(0, H, 34):
        d.line((x, y, x, y + 16), fill=(225, 222, 210), width=2)
for y, w in hstreets:
    for x in range(0, W, 34):
        d.line((x, y, x + 16, y), fill=(225, 222, 210), width=2)
prev = None
for x in range(0, W, 4):
    y = avenue_y(x)
    if prev and (x // 40) % 2 == 0:
        d.line((prev[0], prev[1] - 3, x, y - 3), fill=(232, 196, 92), width=2)
        d.line((prev[0], prev[1] + 3, x, y + 3), fill=(232, 196, 92), width=2)
    prev = (x, y)
# cars
for _ in range(60):
    if random.random() < 0.5:
        x, w = random.choice(vstreets)
        y = random.randint(0, H)
        x += random.choice([-7, 7])
        d.rounded_rectangle((x - 4, y - 8, x + 4, y + 8), radius=2, fill=random.choice([(220, 220, 220), (30, 30, 34), (170, 40, 40), (60, 90, 150), (200, 200, 190)]))
    else:
        x = random.randint(0, W)
        y = avenue_y(x) + random.choice([-12, 12])
        d.rounded_rectangle((x - 8, y - 4, x + 8, y + 4), radius=2, fill=random.choice([(220, 220, 220), (30, 30, 34), (170, 40, 40), (60, 90, 150), (200, 200, 190)]))

# camera grain and slight softness
img = img.filter(ImageFilter.GaussianBlur(0.6))
noise = Image.effect_noise((W, H), 18).convert("RGB")
img = Image.blend(img, noise, 0.07)
img.save(sys.argv[1], "WEBP", quality=78, method=6)
print("ok")
