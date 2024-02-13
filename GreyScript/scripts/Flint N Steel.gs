
print("\n<color=red>(                              (                   \n<color=red>)\ ) (             )           )\ )   )        (   \n<color=red>(()/( )\(        ( /(          (()/(( /(  (   ( )\  \n<color=red>/(_)|(_)\  (    )\())   (      /(_))\())))\ ))((_) \n<color=orange>(_))_|_((_) )\ )(_))/    )\ )  (_))(_))//((_)((_)   \n<color=orange>| |_ | |(_)_(_/(| |_    _(_/(  / __| |_(_))(_))| |  \n<color=orange>| __|| || | ' \))  _|  | ' \)) \__ \  _/ -_) -_) |  \n<color=orange>|_|  |_||_|_||_| \__|  |_||_|  |___/\__\___\___|_|  ")
print("\n\n [1] - ROOT\n [2] - All Users\n\n")

choose = user_input("Make your choose# ").to_int
log = user_input("Would like to see the logs?# ")
comp = get_shell.host_computer
if choose == 1 then
	files = comp.File("/root/.Trash").get_files + comp.File("/root/.Trash").get_folders
else if choose == 2 then
	files = []
	for user in comp.File("/home").get_folders
		files = files + (user.path + "/.Trash")
	end for
else 
	exit("<color=red>Program Ended")
end if

FnS = function()
	for file in files
		file.delete
		if log.upper == "Y" then
			if file.delete then
				print("File deleted: " + file.name)
			else
				print("File couldn't be deleted:" + file.name)
			end if
		end if
	end for
end function

FnS()
