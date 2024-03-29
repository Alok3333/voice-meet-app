class RoomDto {
  id;
  topic;
  roomType;
  speakers;
  ownerId;
  createAt;

  constructor(room) {
    this.id = room._id;
    this.topic = room.topic;
    this.roomType = room.roomType;
    this.speakers = room.speakers;
    this.ownerId = room.ownerId;
    this.createAt = room.createAt;
  }
}

module.exports = RoomDto;
