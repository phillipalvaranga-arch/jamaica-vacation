from PIL import Image, ImageDraw
import math, os
S=1024
GREEN=(0,155,58,255)
GREEN_D=(0,110,42,255)
GOLD=(254,209,0,255)
BLACK=(12,16,14,255)

def draw(maskable=False):
    bg=Image.new("RGBA",(S,S),GREEN)
    d=ImageDraw.Draw(bg)
    d.polygon([(0,0),(S,0),(S/2,S/2)],fill=GREEN_D)
    d.polygon([(0,S),(S,S),(S/2,S/2)],fill=GREEN_D)
    d.polygon([(0,0),(0,S),(S/2,S/2)],fill=BLACK)
    d.polygon([(S,0),(S,S),(S/2,S/2)],fill=BLACK)
    w=108
    d.line([(0,0),(S,S)],fill=GOLD,width=w)
    d.line([(S,0),(0,S)],fill=GOLD,width=w)
    ov=Image.new("RGBA",(S,S),(0,0,0,30))
    bg=Image.alpha_composite(bg,ov)
    d=ImageDraw.Draw(bg)
    sc=0.78 if maskable else 1.0
    cx,cy=S/2, S/2+10
    def P(x,y):
        return (cx+x*sc, cy+y*sc)
    d.ellipse([*P(-90,-320),*P(90,-140)],fill=GOLD)
    trunk=[]
    for i in range(24):
        t=i/23
        x=-40+18*math.sin(t*2.2)
        y=-40+t*260
        trunk.append(P(x,y))
    d.line(trunk,fill=(40,24,12,255),width=int(28*sc))
    for ang,length in [(-70,210),(-30,230),(10,230),(50,200),(-100,160),(80,150)]:
        rad=math.radians(ang-90)
        x2=-30+length*math.cos(rad)
        y2=-50+length*math.sin(rad)
        d.line([P(-30,-50),P(x2,y2)],fill=GOLD,width=int(16*sc))
        for k in (0.4,0.65,0.85):
            mx=-30+length*k*math.cos(rad)
            my=-50+length*k*math.sin(rad)
            px=mx-40*math.sin(rad)
            py=my+40*math.cos(rad)
            d.line([P(mx,my),P(px,py)],fill=GOLD,width=int(10*sc))
    def plane(offx,offy,scale=1.0):
        pts=[
            (offx+0,offy-20),(offx+210,offy-8),(offx+250,offy),
            (offx+210,offy+8),(offx+0,offy+20),(offx-30,offy+8),
            (offx-30,offy-8)
        ]
        pts=[P(x*scale,y*scale) for x,y in pts]
        d.polygon(pts,fill=GOLD,outline=BLACK)
        d.polygon([P((offx+40)*scale,(offy-8)*scale),P((offx+70)*scale,(offy-90)*scale),P((offx+100)*scale,(offy-8)*scale)],fill=GOLD,outline=BLACK)
        d.polygon([P((offx+50)*scale,(offy+8)*scale),P((offx+80)*scale,(offy+80)*scale),P((offx+110)*scale,(offy+8)*scale)],fill=GOLD,outline=BLACK)
        d.polygon([P((offx-10)*scale,(offy-8)*scale),P((offx-20)*scale,(offy-70)*scale),P((offx+20)*scale,(offy-8)*scale)],fill=GOLD,outline=BLACK)
        for wx in (40,70,100,130):
            d.ellipse([*P((offx+wx-7)*scale,(offy-7)*scale),*P((offx+wx+7)*scale,(offy+7)*scale)],fill=BLACK)
    plane(80,40,1.0)
    mask=Image.new("L",(S,S),0)
    r=0 if maskable else int(S*0.22)
    ImageDraw.Draw(mask).rounded_rectangle((0,0,S-1,S-1),radius=r,fill=255)
    im=Image.new("RGBA",(S,S),(0,0,0,0))
    im.paste(bg,(0,0),mask)
    return im

if __name__=="__main__":
    os.makedirs("icons",exist_ok=True)
    a=draw(); m=draw(True)
    a.resize((512,512),Image.LANCZOS).save("icons/icon-512.png")
    a.resize((192,192),Image.LANCZOS).save("icons/icon-192.png")
    m.resize((512,512),Image.LANCZOS).save("icons/maskable-512.png")
    m.resize((180,180),Image.LANCZOS).convert("RGB").save("icons/apple-touch-icon.png")
    a.resize((64,64),Image.LANCZOS).save("icons/favicon.png")
    a.resize((256,256),Image.LANCZOS).save("icon.ico",sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])
    print("ok")
