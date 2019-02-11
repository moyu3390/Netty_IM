package com.wks.codec;

import com.wks.packet.Command;
import com.wks.packet.Packet;
import com.wks.packet.data.EncodeData;
import com.wks.packet.data.MessageResponseData;
import com.wks.serializer.SerializerAlgorithm;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class PacketEncoder extends MessageToByteEncoder<EncodeData> {

    @Override
    protected void encode(ChannelHandlerContext ctx, EncodeData msg, ByteBuf out) throws Exception {
        Packet p = new Packet(msg.getCommand(), SerializerAlgorithm.DEFAULT.serialize(msg));
        p.encode(out);
        //看起来好像不需要再writeFlush
    }

}
