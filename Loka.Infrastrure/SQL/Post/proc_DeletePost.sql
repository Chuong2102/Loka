if(exists(select * from sys.objects where name = 'proc_DeletePost'))
drop proc proc_DeletePost
go
create proc proc_DeletePost 
	@PostID int
as
begin
	-- Check ID
	-- 
	if(not exists(select * from Posts as p where p.PostID = @PostID))
	begin
		return;
	end;

	delete from Posts where PostID = @PostID

end
go
----
select * from Posts
select * from Rooms
select * from Photos
select * from Locations
select * from Addresses