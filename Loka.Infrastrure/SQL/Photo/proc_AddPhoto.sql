--
--go
if(exists(select * from sys.objects where name = 'proc_AddPhoto'))
drop proc proc_AddPhoto
go
create proc proc_AddPhoto 
	@Description nvarchar(max),
	@Title nvarchar(max),
	@Path nvarchar(max),
	@RoomID int
as
begin
	-- Let fuckking inserttt
	insert into Photos(RoomID, Description, Title, CreatedTime, Path)
	values (@RoomID, @Description, @Title, getdate(), @Path)
end
--
select * from Photos