import eel
import eel.browsers



@eel.expose
def hello_eel():
    return "Eello world!"

eel.init("frontend")

eel.browsers.set_path('electron', 'frontend/dist/electron/electron')
eel.start('main.html', mode="electron", cmdline_args=["frontend/dist/main/main.js"])