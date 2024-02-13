/////////////////////////Changes Place//////////////////////////////
customPass = "SomeGoodPassword" //Change it for ur preferences
//Criado por P L 4 G Ue//
///////////////////////////////////////////////////////////////////

print("\n     .--------.\n    / .------. \\n   / /        \ \\n   | |        | |\n  _| |________| |_\n.' |_|        |_| '.\n'._____ ____ _____.'\n|     .'____'.     |\n'.__.'.'    '.'.__.'\n'.__  |Locker|  __.'\n|   '.'.____.'.'   |\n'.____'.____.'____.'\n'.________________.'\n Locker.plg was created by P L 4 G Ue\n")

comp = get_shell.host_computer

if active_user != "root" then
	if active_user == "guest" then
		comp.File(program_path).delete
		print("\n<color=red>!!!Privacy and security blocked your program!!!")
		print("\n<color=green>Cause:")
		exit("<color=red>Guests aren't allowed to run this program, for the PC security this program has been deleted.\n")
	else
		print("\n<color=red>!!!Privacy and security blocked your program!!!")
		print("\n<color=green>Cause:")
		exit("<color=red>root user required to protect the computer.\n")
	end if
end if

customVerify = user_input("Verifying the custom password:", 1)

if customVerify != customPass then
	print("\n<color=red> BAM BAM WRONG PASSWORD. U HAVE ONE MORE CHANCE!!")
	customVerify2 = user_input("Verifying AGAIN:", 1)
	if customVerify2 != customPass then
		comp.File(program_path).delete
		exit("<color=red> U HAD 2 CHANCES NO MORE. THE PROGRAM HAVE BEEN DELETED!!!!")
	end if
end if	

passwd = comp.File("/etc/passwd").content
print(passwd)

for line in passwd
	userandpasswd = line.split(":")
	if userandpasswd[0] == "root" then
		crypto = include_lib("lib/crypto.so")
		rootPasswd = crypto.decipher("root", userandpasswd[1])
		pass = user_input("Type the ROOT password: ", 1)
		if pass == rootPasswd then
			choose = user_input("Do u want to change user password? (Y/N)")
			if choose.upper == "Y" then
				newpass = user_input("New password:", 1)
				comp.change_password("root", newpass)
				continue
			else 
				print("\n<color=grenn> Connected: ROOT password will be changed after closing")
				continue
			end if
		end if
	end if
end for

sudo = user_input("New SUDO: ")

file = comp.File("/")

file.set_owner("root", 1)
file.chmod("u+rwx", 1)
file.chmod("g-rwx", 1)
file.chmod("o-rwx", 1)

terminal = comp.File("/usr/bin/Terminal.exe")

terminal.chmod("u+rwx")
terminal.chmod("g-rwx")
terminal.chmod("o-rwx")

comp.File("/bin/sudo").copy("/bin", sudo)

newSudo = comp.File("/bin/"+sudo)

newSudo.chmod("u+rwx")
newSudo.chmod("g+rwx")
newSudo.chmod("o-rwx")

print("New Owner:" + file.owner)
print("New SUDO:" + sudo)

sudo = get_shell.launch("/bin/"+sudo, "-s")

if sudo == null then
	print("Please change your ROOT password for security :)")
	get_shell.launch("/bin/passwd", "root")
end if
