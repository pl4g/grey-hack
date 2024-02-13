
print("\n<color=yellow> ____ _______   _______   ____     ________            ____   \n<color=yellow>/_   |\   _  \  \   _  \ /_   |    \_____  \ _______  / ___\  \n<color=yellow>|   |/  /_\  \ /  /_\  \ |   |     /   |   \\_  __ \/ /_/  > \n<color=yellow>|   |\  \_/   \\  \_/   \|   |    /    |    \|  | \/\___  /  \n<color=yellow>|___| \_____  / \_____  /|___|    \_______  /|__|  /_____/   \n<color=yellow>				\/        \/                  \/                 ")

if active_user != "root" then
	exit("<color=red>\nConnection to root user needed\n")
end if
comp = get_shell.host_computer
safeFolders = ["/lib", "/sys", "/root", "/var", "/bin", "/usr", "/boot"]
files = comp.File("/").get_files + comp.File("/").get_folders
print("These are the safe folders: "	+ safeFolders) 
log = user_input("Would like to see the logs? ")
binFinder = function()
	for file in files
		for safe in safeFolders
			if file.path == safe then
				continue
			else
				if file.is_binary then
					file.move("/root/Binaries", file.name)
					if log.upper == "Y" then
						if file.move then
							print("Binary moved: " + file.name)
						else
							print("Binary couldn't be moved: " + file.name)
						end if
					end if
				end if
				binFinder()
				if binFinder() then
					continue
				end if	
			end if
		end for
	end for
end function

binFinder()

if not binFinder() then
	exit("<color=red>Something got wrong :/")
end if

