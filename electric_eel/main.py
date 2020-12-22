import eel


@eel.expose
def hello_eel():
    return "Eello world!"

eel.init("static_web_folder")
eel.start("main.html")
