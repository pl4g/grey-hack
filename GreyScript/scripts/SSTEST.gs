print("Simple Security TEST")
comp = get_shell.host_computer
meta = include_lib("/lib/metaxploit.so")
libs = comp.File("/lib").get_files

for lib in libs
	if lib.name == "metaxploit.so" then
		continue
	else
		lib4test = meta.load(lib.path)
		print("Scanning lib: " + lib.name)
		memScan = meta.scan(lib4test)
		for memAd in memScan
			print("Scanning " + memAd + " in " + lib.name)
			memScanned = meta.scan_address(lib4test, memAd)
			for memVul in memScanned
				print("\nExploiting found vulnerability: " + memVul + " in " + memAd + " in " + lib.name)
				overFlow = lib4test.overflow(memAd, memVul)
				if overFlow then
					print("\n<color=red>"+ memAd + "in " + lib.name + " at version" + memScan.version + "have been exploited and returned: " + typeof(overflow))
				else
					print("\n<color=green>Couldn't exploit " + memAd + " in " + lib.name + " at version " + memScan.version)
					print("<color=red>BUT OTHER PLAYERS CAN EXPLOIT IT SO WATCH OUT.")
				end if
			end for
		end for
	end if
end for
