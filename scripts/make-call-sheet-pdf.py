#!/usr/bin/env python3
"""Builds public/call-sheet.pdf: the printable DVA call sheet as a fixed two-page A4 PDF.

Run it again whenever the call sheet's wording or DVA's phone details change
(see "dva-contact" in src/content/source-watch.ts). Needs: pip install reportlab.
The wording must match src/routes/call-sheet.tsx.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
import os

INK, SOFT, MUTED = HexColor("#0b1f3a"), HexColor("#24364d"), HexColor("#5a6b7d")
W, H = A4
M = 14 * mm
CW = W - 2 * M
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "call-sheet.pdf")

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("DVA call sheet - Veteran Assist")
c.setAuthor("Veteran Assist")
c.setSubject("A log for a phone call to DVA. Not advice.")

def text(x, y, s, font="Helvetica", size=10, color=INK):
    c.setFont(font, size); c.setFillColor(color); c.drawString(x, y, s)

def para(x, y, s, font="Helvetica", size=9.5, color=SOFT, width=CW, lead=None):
    lead = lead or size * 1.35
    for line in simpleSplit(s, font, size, width):
        text(x, y, line, font, size, color); y -= lead
    return y

def rule(x, y, w, lw=0.6):
    c.setStrokeColor(INK); c.setLineWidth(lw); c.line(x, y, x + w, y)

def field(x, y, w, label, lines=1, pitch=9.4 * mm):
    """Label, then ruled writing lines. Returns the y below the last line."""
    text(x, y, label, "Helvetica-Bold", 9)
    y -= pitch * 0.95
    for _ in range(lines):
        rule(x, y, w); y -= pitch
    return y + pitch * 0.35

def box(x, y_top, w, h, lw=0.8, color=INK, r=2 * mm):
    c.setStrokeColor(color); c.setLineWidth(lw); c.roundRect(x, y_top - h, w, h, r, stroke=1, fill=0)

# ---------------- Page 1 ----------------
y = H - M - 3 * mm
text(M, y, "VETERAN ASSIST", "Helvetica-Bold", 8, MUTED)
y -= 9 * mm
text(M, y, "DVA call sheet", "Helvetica-Bold", 22)
y -= 6 * mm
text(M, y, "One claim. Ask in this order. Write the reference before you hang up.", "Helvetica", 9.5, SOFT)
y -= 4 * mm

bx = [
    ("Helvetica-Bold", "DVA: 1800 VETERAN (1800 838 372) — 8am to 5pm local time, Monday to Friday.", INK),
    ("Helvetica", "From overseas: +61 2 6289 1133. Interpreter: TIS on 131 450. Deaf, hard of hearing or speech difficulty: National Relay Service, then give them 1800 838 372.", SOFT),
    ("Helvetica", "Calling for someone else? DVA needs form D9325 signed first.", SOFT),
]
lines = []
for f, s, col in bx:
    for ln in simpleSplit(s, f, 9.5, CW - 8 * mm):
        lines.append((f, ln, col))
bh = len(lines) * 4.6 * mm + 5 * mm
box(M, y, CW, bh)
yy = y - 6.2 * mm
for f, ln, col in lines:
    text(M + 4 * mm, yy, ln, f, 9.5, col); yy -= 4.6 * mm
y -= bh + 8 * mm

text(M, y, "Before you dial", "Helvetica-Bold", 13)
y -= 3 * mm
half = (CW - 8 * mm) / 2
r1 = y - 4 * mm
a = field(M, r1, half, "Name"); field(M + half + 8 * mm, r1, half, "Date of birth")
r2 = a - 2 * mm
a = field(M, r2, half, "DVA file number"); field(M + half + 8 * mm, r2, half, "Claim number")
r3 = a - 2 * mm
a = field(M, r3, half, "Condition (plain words)"); field(M + half + 8 * mm, r3, half, "Letter or report in front of me (date)")
r4 = a - 2 * mm
y = field(M, r4, CW, "The one thing I want from this call") - 9 * mm

text(M, y, "Ask in this order", "Helvetica-Bold", 13)
y -= 5 * mm
text(M, y, "Tick each one as you ask it.", "Helvetica", 8.5, SOFT)
y -= 6 * mm
questions = [
    "Can you confirm you are looking at my ______ claim, number ______?",
    "Where is that claim up to right now?",
    "What is it waiting on, and who has to provide it?",
    "Is there anything you need from me? Where and how do I send it?",
    "Who has the file now (which team or delegate)?",
    "What is the next step, and who does it — you or me?",
    "When will I hear, and how (letter, MyService, phone)?",
    "What is your name, your position number, and the reference for this call?",
]
for i, q in enumerate(questions, 1):
    c.setStrokeColor(INK); c.setLineWidth(0.7)
    c.rect(M, y - 1.2 * mm, 4 * mm, 4 * mm)            # number box
    text(M + 1.15 * mm, y - 0.1 * mm, str(i), "Helvetica-Bold", 7.5)
    c.rect(M + 6.5 * mm, y - 1.2 * mm, 4 * mm, 4 * mm)  # tick box
    text(M + 13.5 * mm, y, q, "Helvetica", 10)
    y -= 8.4 * mm
y -= 5 * mm

after = [
    "If they promised something, put it in writing: use the follow-up letter at veteranassist.au/letters/follow-up.",
    "Add the call to My file on veteranassist.au. It stays on your own device.",
    "If nothing happens by the date they gave, see the delays guide at veteranassist.au/guides/delays, or run the Pathfinder: “A claim has gone quiet or is overdue”.",
]
wrapped = [simpleSplit(s, "Helvetica", 9.5, CW - 14 * mm) for s in after]
ah = 11 * mm + sum(len(w) for w in wrapped) * 4.4 * mm + len(after) * 1.2 * mm
box(M, y, CW, ah, 0.6, HexColor("#cdd6e0"))
yy = y - 7 * mm
text(M + 4 * mm, yy, "After the call", "Helvetica-Bold", 12)
yy -= 6 * mm
for w in wrapped:
    c.setFillColor(INK); c.circle(M + 5.5 * mm, yy + 1.2 * mm, 0.6 * mm, stroke=0, fill=1)
    for ln in w:
        text(M + 9 * mm, yy, ln, "Helvetica", 9.5, INK); yy -= 4.4 * mm
    yy -= 1.2 * mm
y -= ah + 6 * mm

text(M, y, "A phone promise is not a decision. If it matters, ask for it in writing.", "Helvetica-Bold", 9.5)
y -= 5 * mm
para(M, y,
     "Keep this sheet with your DVA papers. Do not post a photo of it online. Veteran Assist is independent of DVA and Defence. "
     "This sheet is a log. It is not advice. DVA phone details from DVA’s Contact us page, updated 5 February 2026. "
     "Last checked on this site: 1 November 2026.", size=8, color=MUTED)
c.showPage()

# ---------------- Page 2: two call logs ----------------
def call_block(n, top, height):
    box(M, top, CW, height)
    x = M + 5 * mm
    iw = CW - 10 * mm
    y = top - 8 * mm
    text(x, y, f"Call {n}", "Helvetica-Bold", 13)
    y -= 5 * mm
    hw = (iw - 8 * mm) / 2
    pitch = PITCH
    a = field(x, y, hw, "Date and time", 1, pitch); field(x + hw + 8 * mm, y, hw, "Team", 1, pitch)
    y = a - 1 * mm
    a = field(x, y, hw, "Their name and position number (PN)", 1, pitch); field(x + hw + 8 * mm, y, hw, "Reference number for this call", 1, pitch)
    y = a - 1 * mm
    y = field(x, y, iw, "What I asked", 3, pitch) - 1 * mm
    y = field(x, y, iw, "What they said", 4, pitch) - 1 * mm
    a = field(x, y, hw, "What happens next, and by when", 3, pitch); field(x + hw + 8 * mm, y, hw, "What I will do", 3, pitch)

# Each block is 20 mm of title and gaps plus 15 line-pitches (5 fields: 1+1+3+4+3 lines, 0.6 pitch of label each).
PITCH = ((H - 2 * M - 6 * mm) / 2 - 20 * mm) / 15
bh = 20 * mm + 15 * PITCH
call_block(1, H - M, bh)
call_block(2, H - M - bh - 6 * mm, bh)
c.showPage()
c.save()
print("wrote", os.path.abspath(OUT))
