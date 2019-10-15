
#创建数据库
create database IF NOT EXISTS `avue` default character set utf8 collate utf8_general_ci;
 
#使用该数据库
use `avue`;

#创建表
#商品表
create table `avue_prod`(
	`prod_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '产品ID',
	`prod_name` varchar(300) NOT NULL DEFAULT '' COMMENT '商品名称',
	`shop_id` bigint(20) DEFAULT NULL COMMENT '店铺id',
	`ori_price` decimal(15,2) DEFAULT '0.00' COMMENT '原价',
	`price` decimal(15,2) DEFAULT NULL COMMENT '现价',
	`brief` varchar(500) DEFAULT '' COMMENT '简要描述,卖点等',
	`content` text COMMENT '详细描述',
	`pic` varchar(255) DEFAULT NULL COMMENT '商品主图',
	`imgs` varchar(1000) DEFAULT NULL COMMENT '商品图片，以,分割',
	`status` varchar(1) DEFAULT '1' COMMENT '默认是1，表示正常状态, 0下架',
	`category_id` bigint(20) unsigned DEFAULT NULL COMMENT '商品分类',
	`sold_num` int(11) DEFAULT NULL COMMENT '销量',
	`total_stocks` int(11) DEFAULT '0' COMMENT '总库存',
	`delivery_mode` json DEFAULT NULL COMMENT '配送方式json见TransportModeVO',
	`delivery_template_id` bigint(20) DEFAULT NULL COMMENT '运费模板id',
	`create_time` datetime DEFAULT NULL COMMENT '录入时间',
	`update_time` datetime DEFAULT NULL COMMENT '修改时间',
	`putaway_time` datetime DEFAULT NULL COMMENT '上架时间',
	PRIMARY KEY (prod_id)
)default charset=utf8;
#商品分类表
create table `avue_category`(
	`id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
	`category_num`varchar(255) NOT NULL DEFAULT '' COMMENT '分类编码',
	`category_id` varchar(255) NOT NULL DEFAULT '' COMMENT '分类Id',
	`category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
	`category_level` int(1) DEFAULT '1' COMMENT '默认级别为1',
	`category_parentId` varchar(255) NOT NULL DEFAULT '' COMMENT '父级关联ID',
	`status` varchar(1) DEFAULT '1' COMMENT '默认是1，表示启用状态, 0禁用',
	`create_time` datetime DEFAULT NULL COMMENT '创建时间',
	`update_time` datetime DEFAULT NULL COMMENT '修改时间',
	PRIMARY KEY (id)
 )default charset=utf8;